import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { DefaultOptionType, SelectProps } from "antd/es/select";

interface ISelectWithTag extends SelectProps {
	placeholder?: string;
	dataOption?: DefaultOptionType[];
	colorTag: "gold" | "lime" | "green" | "cyan";
}

export const SelectWithTag = ({
	placeholder,
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
		return (
			<Tag
				color={colorTag}
				onMouseDown={onPreventMouseDown}
				closable={closable}
				onClose={onClose}
				style={{ marginRight: 3 }}
			>
				{label}
			</Tag>
		);
	};

	return (
		<Select
			{...props}
			mode="tags"
			tagRender={tagRender}
			style={{ width: "100%" }}
			placeholder={placeholder}
			options={dataOption}
		/>
	);
};
