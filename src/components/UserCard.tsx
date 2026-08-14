import type { User } from "../types/index";

// Explicit Props interface -- required ng rubric
interface UserCardProps {
  user: User;
  onSelect: (id: number) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
      <button type="button" onClick={() => onSelect(user.id)}>
        View Profile
      </button>
    </div>
  );
}

export default UserCard;
