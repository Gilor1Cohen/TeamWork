import type { MembersTableProps } from "../../../Types/UI.Types";
import "./MembersTable.css";

function MembersTable({ Members }: MembersTableProps) {
  return (
    <table className="members-table">
      <thead className="members-table-head">
        <tr className="members-table-row">
          <th className="members-table-th">Name</th>
          <th className="members-table-th">Role</th>
          <th className="members-table-th">ID</th>
        </tr>
      </thead>

      <tbody className="members-table-body">
        {Members.map((member) => (
          <tr key={member._id + member.Name} className="members-table-row">
            <td className="members-table-td">{member.Name}</td>
            <td className="members-table-td">{member.Role}</td>
            <td className="members-table-td">{member._id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MembersTable;
