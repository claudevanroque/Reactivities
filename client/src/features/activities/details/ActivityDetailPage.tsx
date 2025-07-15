
import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/useActitvity";
import ActiviyDetailsHeader from "./components/ActiviyDetailsHeader";
import ActivityDetailsInfo from "./components/ActivityDetailsInfo";
import ActivityDetailsChat from "./components/ActivityDetailsChat";
import ActivityDetailsSidebar from "./components/ActivityDetailsSidebar";

export default function ActivityDetailPage() {
	const {id} = useParams();
	const {activity, isActivityLoading} = useActivity(id);

	if (isActivityLoading) return <Typography>Loading...</Typography>;
	if (!activity) return <Typography variant="h6" color="error">Activity not found</Typography>;
	return (
		<Grid2 container spacing={3} >
			<Grid2 size={8}>
				<ActiviyDetailsHeader activity={activity}/>
				<ActivityDetailsInfo activity={activity}/>
				<ActivityDetailsChat />
			</Grid2>
			<Grid2 size={4}>
				<ActivityDetailsSidebar />
			</Grid2>
		</Grid2>
	)
}
