import { ThemeState } from "styles/theme/slice/types";
import { BoxesInterfaceState } from "store/Types/BoxTypes";
import { AreasInterfaceState } from "store/Types/AreaTypes";
import { RequestBoxesInterfaceState } from "store/Types/RequestBoxTypes";
import { CarsInterfaceState } from "store/Types/CarTypes";
import { DocumentsInterfaceState } from "store/Types/DocumentTypes";
import { CabinetsInterfaceState } from "store/Types/CabinetTypes";
import { DivisionsInterfaceState } from "store/Types/DivisionTypes";
import { CompanysInterfaceState } from "store/Types/CompanyTypes";
import { BorrowItemsInterfaceState } from "store/Types/BorrowItemTypes";
import { FoldersInterfaceState } from "store/Types/FolderTypes";
import { TransportersInterfaceState } from "store/Types/TransporterTypes";
import { ArchiversInterfaceState } from "store/Types/ArchiverTypes";
import { LoginsInterfaceState } from "store/Types/LoginTypes";
import { PickUpItemsInterfaceState } from "store/Types/PickUpTypes";
import { RoomsInterfaceState } from "store/Types/RoomTypes";
import { CustomersInterfaceState } from "store/Types/CustomerTypes";

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
	theme?: ThemeState;
	boxes?: BoxesInterfaceState;
	areas?: AreasInterfaceState;
	companys?: CompanysInterfaceState;
	requestBoxes?: RequestBoxesInterfaceState;
	documents?: DocumentsInterfaceState;
	cars?: CarsInterfaceState;
	cabinets?: CabinetsInterfaceState;
	divisions?: DivisionsInterfaceState;
	borrowItems?: BorrowItemsInterfaceState;
	folders?: FoldersInterfaceState;
	transporters?: TransportersInterfaceState;
	archivers?: ArchiversInterfaceState;
	logins?: LoginsInterfaceState;
	pickUpItems?: PickUpItemsInterfaceState;
	rooms?: RoomsInterfaceState;
	customers?: CustomersInterfaceState;

	// [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
