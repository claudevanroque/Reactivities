import { Box, Button, ButtonGroup, List, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

// export default function Counter() {
// 	const { counterStore } = useStore();
// 	return (
// 		<>
// 			<Observer>
// 				{() => (
// 					<>
// 						<Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
// 						<Typography variant="h6">Count: {counterStore.count}</Typography>
// 					</>
// 				)}
// 			</Observer>
// 			<ButtonGroup sx={{mt:3}}>
// 				<Button variant="contained" color="primary" onClick={() => counterStore.increment()}>Increment</Button>
// 				<Button variant="contained" color="secondary" onClick={() => counterStore.decrement()}>Decrement</Button>
// 				<Button variant="contained" color="success" onClick={() => counterStore.increment(5)}>Increment by 5</Button>
// 			</ButtonGroup>
// 		</>
// 	)
// }

const Counter = () => {
	const { counterStore } = useStore();
	return (
		<Box display="flex"  justifyContent="space-between">
			<Box sx={{width: "60%"}}>
				<Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
				<Typography variant="h6">Count: {counterStore.count}</Typography>
				<ButtonGroup sx={{mt:3}}>
					<Button variant="contained" color="secondary" onClick={() => counterStore.decrement()} sx={{mr: 1}}>Decrement</Button>
					<Button variant="contained" color="primary" onClick={() => counterStore.increment()} sx={{mr: 1}}>Increment</Button>
					<Button variant="contained" color="success" onClick={() => counterStore.increment(5)} sx={{mr: 1}}>Increment by 5</Button>
				</ButtonGroup>
			</Box>
			<Paper sx={{width: "40%", p: 4}}>
				<Typography variant="h5" gutterBottom>Counter events ({counterStore.eventCount})</Typography>
				<Typography variant="body1">Inital count is {counterStore.count}</Typography>
				<List>
					{counterStore.events.map((event, index) => (
						<Typography key={index} variant="body1">{event}</Typography>
					))}
				</List>
			</Paper>
		</Box>
	);
};

const ObservedCounter = observer(Counter);

export default ObservedCounter;
