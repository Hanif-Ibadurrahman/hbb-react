import { ThemeState } from "styles/theme/slice/types";
import { ILoginInterfaceState } from "store/types/loginTypes";
import { ICountryInterfaceState } from "store/types/countryTypes";

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
	theme?: ThemeState;
	loginReducer?: ILoginInterfaceState;
	countryReducer?: ICountryInterfaceState;
	// [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
