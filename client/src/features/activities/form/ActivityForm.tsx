import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { getDateInputValue } from "../../../lib/Helpers/helpers";
import { useActivity } from "../../../lib/hooks/useActitvity";

type Props = {
	closeForm: () => void;
	activity?: Activity;
}

export default function ActivityForm({ closeForm, activity }: Props) {
	const {updateActivity, createActivity} = useActivity();
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
			closeForm();
		}else{
			await createActivity.mutateAsync(data as unknown as Activity);
			closeForm();
		}
	};
	return (
		<Paper sx={{ padding: 3, borderRadius: 3 }}>
			<Typography variant="h5" gutterBottom color="primary">
				Create Activity
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
					<Button onClick={closeForm} color="inherit">
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
