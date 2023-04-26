import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { DefaultOptionType, SelectProps } from "antd/es/select";
import { generateRandomHex } from "app/helper/common";
interface ISelectWithTag extends SelectProps {
	placeholder?: string;
	mode?: "tags" | "multiple";
	dataOption?: DefaultOptionType[];
	colorTag?: "gold" | "lime" | "green" | "cyan";
}

export const SelectWithTag = ({
	placeholder,
	mode,
	dataOption,
	colorTag,
	...props
}: ISelectWithTag) => {
	const tagRender = (props: CustomTagProps) => {
		const { label, value, closable, onClose } = props;
		const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
			event.preventDefault();
			event.stopPropagation();
		};
		const randomColor = `#${generateRandomHex(6)}`;
		return (
			<Tag
				color={colorTag ?? randomColor}
				onMouseDown={onPreventMouseDown}
				closable={closable}
				onClose={onClose}
				style={{ marginRight: 3 }}
			>
				{label}
			</Tag>
		);
	};

	const modeSelect = mode ?? "tags";

	return (
		<Select
			{...props}
			mode={modeSelect}
			tagRender={tagRender}
			style={{ width: "100%" }}
			placeholder={placeholder}
			options={dataOption}
		/>
	);
};
