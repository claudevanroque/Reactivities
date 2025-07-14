import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
	activities: Activity[];
	selectedActivity?: Activity;
	selectActivity: (id: string) => void;
	cancelSelectActivity: () => void;
	editMode: boolean;
	openForm: (id?: string) => void;
	closeForm: () => void;

}

export default function ActivityDashboard({
	activities, selectActivity, selectedActivity, cancelSelectActivity, editMode, openForm, closeForm
}: Props) {
	return (
		<Grid2 container spacing={3}>
			<Grid2 size={8}>
				<ActivityList 
					activities={activities} 
					selectActivity={selectActivity}
				/>
			</Grid2>
			<Grid2 size={4}>
				{selectedActivity && !editMode &&
					<ActivityDetail 
						selectedActivity={selectedActivity} 
						cancelSelectActivity={cancelSelectActivity}
						openForm={openForm}
						/>
				}
				{editMode &&
					<ActivityForm 
						closeForm={closeForm} 
						activity={selectedActivity} 
					/>
				}
			</Grid2>
		</Grid2>
	)
}
