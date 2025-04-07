import { useNavigate } from "react-router-dom";

const AnnouncementsTable = ({ announcements }) => {
    const navigate = useNavigate();

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {announcements.map((announcement) => (
                        <tr
                            key={announcement._id}
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/announcements/${announcement._id}`)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                {announcement.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {announcement.description.slice(0, 50)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {announcement.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(announcement.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementsTable;
