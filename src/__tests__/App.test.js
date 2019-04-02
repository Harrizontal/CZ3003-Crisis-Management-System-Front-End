import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import App from "../App";
import Overview from "../components/pages/cms/overview/Overview";
import NotFound from "../components/pages/NotFound";
import asd from "../components/pages/";
import { MemoryRouter } from "react-router";
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Static render - redner the given component and return plain HTML
// Shallow render - render *just* given componenet and non of its children
// Full DOM - render the component and all of its children + let us modify it afterward

Enzyme.configure({ adapter: new Adapter() });

// it("renders without crashing", () => {
//   const wrapped = shallow(<App />);

//   expect(wrapped.find(Overview).length).toEqual(1);
// });

// it("renders without crashing", () => {
//   const wrapped = shallow(<App />);

//   expect(wrapped.find(Incidents).length).toEqual(1);
// });

// test("invalid path should redirect to 404", () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={["/"]}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(wrapper.find(NotFound)).toHaveLength(1);
// });

// test("invalid path should redirect to 404", () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={["/cms"]}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(wrapper.find(Incidents)).toHaveLength(1);
// });
