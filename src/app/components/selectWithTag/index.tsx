import { Select, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { DefaultOptionType, SelectProps } from "antd/es/select";
import { generateRandomHex } from "app/helper/common";
import { isUndefined } from "lodash";
import { useMemo } from "react";
interface ISelectWithTag extends SelectProps {
	placeholder?: string;
	mode?: "tags" | "multiple";
	open?: boolean;
	dataOption?: DefaultOptionType[];
	valueOption?: "value" | "label";
	colorTag?: "gold" | "lime" | "green" | "cyan";
}

export const SelectWithTag = ({
	placeholder,
	mode,
	open,
	dataOption,
	valueOption,
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
	const isOpen = !isUndefined(dataOption) ? undefined : open ?? false;
	const isChangeValueOption = valueOption ?? "value";
	const options = useMemo(() => {
		if (dataOption) {
			return isChangeValueOption === "label"
				? dataOption.map(data => ({ ...data, value: `${data.label}` }))
				: dataOption;
		}
	}, [dataOption, isChangeValueOption]);

	return (
		<Select
			{...props}
			mode={modeSelect}
			open={isOpen}
			tagRender={tagRender}
			style={{ width: "100%" }}
			placeholder={placeholder}
			options={options}
		/>
	);
};
