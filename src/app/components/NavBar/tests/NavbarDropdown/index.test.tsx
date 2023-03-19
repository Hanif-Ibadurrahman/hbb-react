import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { NavBarDropdown } from "../../NavBarDropdown/index";

const shallowRenderer = createRenderer();

describe("<NavBarDropdown />", () => {
	it("should match snapshot", () => {
		shallowRenderer.render(<NavBarDropdown />);
		const renderedOutput = shallowRenderer.getRenderOutput();
		expect(renderedOutput).toMatchSnapshot();
	});
});
