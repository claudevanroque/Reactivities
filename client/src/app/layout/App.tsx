import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivity } from "../../lib/hooks/useActitvity";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);  
  const { activities, isPending } = useActivity();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((activity) => activity.id === id));
  };

  const handleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelActivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  }


  return (
    <Box sx={{ bgcolor: "#eeeeee" , minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth={false} sx={{ marginTop: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>  
        ) : (
          <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
