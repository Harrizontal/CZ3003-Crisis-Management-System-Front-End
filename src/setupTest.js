import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Static render - redner the given component and return plain HTML
// Shallow render - render *just* given componenet and non of its children
// Full DOM - render the component and all of its children + let us modify it afterward

Enzyme.configure({ adapter: new Adapter() });

