import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { getDateInputValue } from "../../../lib/Helpers/helpers";
import { useActivity } from "../../../lib/hooks/useActitvity";
import { useParams, useNavigate, Link } from "react-router";


export default function ActivityForm() {
	const {id} = useParams();
	const {updateActivity, createActivity, activity, isActivityLoading} = useActivity(id);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Handle form submission logic here
		const formData = new FormData(event.currentTarget);
		const data : {[key: string]: FormDataEntryValue} = {};

		formData.forEach((value, key) => {
			data[key] = value;
		});

		if (activity) {
			data.id = activity.id; // Ensure the ID is included for updates
			await updateActivity.mutateAsync(data as unknown as Activity);
			navigate(`/activities/${activity.id}`);
		}else{
			await createActivity.mutateAsync(data as unknown as Activity, {
				onSuccess: (id) => {
					navigate(`/activities/${id}`);
				}
			});
		}
	};

	if (isActivityLoading) return <Typography>Activity is Loading...</Typography>;
	return (
		<Paper sx={{ padding: 3, borderRadius: 3 }}>
			<Typography variant="h5" gutterBottom color="primary">
				{activity ? "Edit Activity" : "Create Activity"}
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				display="flex"
				flexDirection="column"
				gap={3}
			>
				<TextField
					label="Title"
					name="title"
					defaultValue={activity?.title}
				/>
				<TextField
					label="Description"
					name="description"
					defaultValue={activity?.description}
					multiline
					rows={3}
				/>
				<TextField
					label="Category"
					name="category"
					defaultValue={activity?.category}
				/>
				<TextField
					label="Date"
					name="date"
					type="date"
					defaultValue={getDateInputValue(activity?.date)}
					InputLabelProps={{ shrink: true }}
				/>
				<TextField
					label="City"
					name="city"
					defaultValue={activity?.city}
				/>
				<TextField
					label="Venue"
					name="venue"
					defaultValue={activity?.venue}
				/>
				<Box display="flex" justifyContent="flex-end" gap={3}>
					<Button component={Link} to={activity?.id ?`/activities/${activity?.id}` : "/activities"} color="inherit">
						Cancel
					</Button>
					<Button 
						type="submit" 
						variant="contained" 
						color="success"
						disabled={updateActivity.isPending || createActivity.isPending}
						>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}
