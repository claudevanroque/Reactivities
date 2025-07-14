import { formatDateAndTime } from "../../../lib/Helpers/helpers";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useActivity } from "../../../lib/hooks/useActitvity";

type Props = {
	selectedActivity: Activity;
	cancelSelectActivity: () => void;
	openForm: (id?: string) => void;
}

export default function ActivityDetail({selectedActivity, cancelSelectActivity, openForm}: Props) {
	const {activities} = useActivity();
	const activity = activities?.find(a => a.id === selectedActivity.id);

	if (!activity) return <Typography variant="h6" color="error">Activity not found</Typography>;
	return (
		<Card sx={{borderRadius: 3}}>
			<CardMedia
				component="img"
				src={`/images/categoryImages/${activity.category}.jpg`}
			/>
			<CardContent>
				<Typography variant="h5">{activity.title}</Typography>
				<Typography variant="subtitle1" fontWeight="light">{formatDateAndTime(activity.date)}</Typography>
				<Typography variant="body1">{activity.description}</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={() => openForm(activity.id)} color="primary">Edit</Button>
				<Button onClick={() => cancelSelectActivity()} color="inherit">Cancel</Button>
			</CardActions>
		</Card>
		
	)
}
