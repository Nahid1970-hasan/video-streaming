import { StyledBadge } from "./style/Badge_styled"

export const Badge = ({ children, badgeContent }) => {
    return (<StyledBadge badgeContent={badgeContent}>
        {children}
        <span>{badgeContent}</span>
    </StyledBadge>);
}