import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { DefaultOptionType } from "antd/es/select";

interface ISelectWithTag {
	placeholder?: string;
	dataOption?: DefaultOptionType[];
	colorTag: "gold" | "lime" | "green" | "cyan";
	onChange?: (value: string) => void;
}

export const SelectWithTag = ({
	placeholder,
	dataOption,
	colorTag,
	onChange,
}: ISelectWithTag) => {
	const handleChange = (value: string) => {
		if (onChange) {
			onChange(value);
		}
	};

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
			mode="tags"
			tagRender={tagRender}
			style={{ width: "100%" }}
			placeholder={placeholder}
			onChange={handleChange}
			options={dataOption}
		/>
	);
};
