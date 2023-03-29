import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { DefaultOptionType } from "antd/es/select";

interface ISelectWithTag {
	placeholder?: string;
	dataOption?: DefaultOptionType[];
	colorTag: "gold" | "lime" | "green" | "cyan";
}

export const SelectWithTag = ({
	placeholder,
	dataOption,
	colorTag,
}: ISelectWithTag) => {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const tagRender = (props: CustomTagProps) => {
		const { label, value, closable, onClose } = props;
		const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
			event.preventDefault();
			event.stopPropagation();
		};
		console.log(value);
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
			mode="tags"
			tagRender={tagRender}
			style={{ width: "100%" }}
			placeholder={placeholder}
			onChange={handleChange}
			options={dataOption}
		/>
	);
};
