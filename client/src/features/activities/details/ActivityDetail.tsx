import { formatDateAndTime } from "../../../lib/Helpers/helpers";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivity } from "../../../lib/hooks/useActitvity";

export default function ActivityDetail() {
	const navigate = useNavigate();
	const {id} = useParams();
	const {activity, isActivityLoading} = useActivity(id);

	if (isActivityLoading) return <Typography>Loading...</Typography>;
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
				<Button component={Link} to={`/edit-activity/${activity.id}`} color="primary">Edit</Button>
				<Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>
			</CardActions>
		</Card>
		
	)
}
