import { StyledChip } from "./style/Chip_styled";
import { ChipInput } from "./style/Input_styled";

export const Chip = ({ label, color }) => {
    return <StyledChip color={color}>
        <span>{label}</span>
    </StyledChip>;
}

export const ColorChip = ({color }) => {
    return <ChipInput  
    type="color"
    name="color_code_grid" 
    value={color || "#000"} 
    disabled
  />;
}