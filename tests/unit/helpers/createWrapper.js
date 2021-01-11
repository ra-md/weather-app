import { mount } from '@vue/test-utils';
import { locationData } from '../helpers/fakeData';

// export default function createWrapper({ data = locationData, options = {} } = {}) {
//   return mount(LocationItem, {
//     props: { 
//       locationData: data
//     },
//     ...options,
//   });
// }

export default function createWrapper(component) {
  return ({ data = locationData, options = {} } = {}) => {
    return mount(component, {
      props: { 
        locationData: data
      },
      ...options,
    });
  };
}
