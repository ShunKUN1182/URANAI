import "./css/userAvatar.css";

const avatarColors = ["#ef9a9a", "#ffcc80", "#fff59d", "#a5d6a7", "#80cbc4", "#81d4fa", "#9fa8da", "#ce93d8", "#f48fb1"];

type UserAvatarProps = {
    userDatabaseId?: number | string | null;
    userName: string;
    userIcon: string;
    className?: string;
};

export function getAvatarColor(userDatabaseId?: number | string | null) {
    const id = Number(userDatabaseId);

    if (!Number.isFinite(id)) {
        return undefined;
    }

    const lastDigit = Math.abs(id) % 10;
    return lastDigit === 9 ? undefined : avatarColors[lastDigit];
}

function UserAvatar({ userDatabaseId, userName, userIcon, className = "" }: UserAvatarProps) {
    const avatarColor = getAvatarColor(userDatabaseId);

    if (avatarColor) {
        return (
            <div
                className={`user-avatar user-avatar--generated ${className}`.trim()}
                style={{ backgroundColor: avatarColor }}
                aria-label={`${userName}のアイコン`}
            >
                {userName.slice(0, 1)}
            </div>
        );
    }

    return <img src={userIcon} alt={`${userName}のアイコン`} className={`user-avatar ${className}`.trim()} />;
}

export default UserAvatar;
