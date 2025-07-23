import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router"

export default function ServerError() {
	const location = useLocation();
	const error = (location.state as { error?: { message?: string; details?: string } })?.error;
 return (
	<Paper>
		{error ? (
			<>
				<Typography gutterBottom variant="h3" sx={{px: 4, pt: 2}} color="secondary">
					{error?.message || "There has been an error - please try again later."}
				</Typography>
				<Divider />
				<Typography variant="body1" sx={{px: 4, pt: 2}}>
					{error?.details || "Internal server error - please try again later."}
				</Typography>
			</>
		) : (
			<Typography variant="h5" sx={{px: 4, pt: 2}} color="secondary">
				Server error - please try again later.
			</Typography>
		)}
	</Paper>
  )
}
