import { useLocation, useNavigate } from "react-router-dom";
import type { Member, Team } from "../../../Types/UI.Types";
import MembersTable from "../../UI/MembersTable/MembersTable";
import { AuthContext } from "../../Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import BtnOne from "../../UI/BtnOne/BtnOne";
import "./EditTeamPage.css";
import axios from "axios";
import OptionInput from "../../UI/OptionInput/OptionInput";

function EditTeamPage() {
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [teamData, setTeamData] = useState<Team>(location.state);

  const auth = useContext(AuthContext);

  const userId: string | undefined = useContext(AuthContext)?.user?.id;
  const thisUserRole: string | undefined = teamData.Members.find(
    (member: Member) => member._id == userId,
  )?.Role;

  useEffect(() => {
    if (thisUserRole !== "manager") {
      navigate("/");
    }
  }, [thisUserRole, navigate]);

  useEffect(() => {
    reset();
  }, [isAdd]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{
    UserId: string;
    Name?: string;
    Role?: string;
    TeamId?: string;
  }>();

  async function onSubmit(data: {
    UserId: string;
    Name?: string;
    Role?: string;
    TeamId?: string;
  }) {
    if (data.UserId === userId) return;
    setError(null);
    setLoading(true);

    try {
      const action = isAdd ? "add" : "remove";

      data.TeamId = teamData._id;

      const response = await axios.post<Member>(
        `http://localhost:3001/${action}TeamMember`,
        data,
        { withCredentials: true },
      );

      console.log(response);

      isAdd
        ? setTeamData((prev) => ({
            ...prev,
            Members: [...prev.Members, response.data],
          }))
        : setTeamData((prev) => ({
            ...prev,
            Members: prev.Members.filter((m: Member) => m._id !== data.UserId),
          }));
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        auth?.setUser(null);
        navigate("/login");
        return;
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <section id="EditTeamPage">
      <div className="btn-container">
        <label className="switch btn-color-mode-switch">
          <input
            defaultValue={1}
            id="color_mode"
            name="color_mode"
            type="checkbox"
            onChange={() => setIsAdd((value) => !value)}
          />
          <label
            className="btn-color-mode-switch-inner"
            data-off="Add"
            data-on="Remove"
            htmlFor="color_mode"
          />
        </label>
      </div>

      <form id="EditTeamPage-Form" onSubmit={handleSubmit(onSubmit)}>
        {isAdd ? <h1>Add Team Member</h1> : <h1>Remove Team Member</h1>}
        <Input
          Register={register}
          Type="text"
          Name="UserId"
          Placeholder="UserId"
          Error={errors.UserId?.message}
          Label="UserId"
          Rules={{ required: "UserId is required" }}
        />

        {isAdd && (
          <>
            <Input
              Register={register}
              Type="text"
              Name="Name"
              Placeholder="User name"
              Error={errors.Name?.message}
              Label="User Name"
              Rules={{ required: "User Name is required" }}
            />

            <OptionInput
              title="Role"
              options={["manager", "worker"]}
              error={errors.Role?.message}
              name="Role"
              Register={register}
              rules={{
                required: "Role is required",
              }}
            />
          </>
        )}

        <BtnOne
          text={isAdd ? "Add" : "Remove"}
          isDisabled={!isValid || loading}
          type="submit"
        />

        {error && <p>{error}</p>}
        {loading && <p>loading...</p>}
      </form>

      <MembersTable Members={teamData.Members} />
    </section>
  );
}

export default EditTeamPage;
