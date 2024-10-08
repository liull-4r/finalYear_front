import { Link } from "react-router-dom";
import background from "../../../assets/img/Custom/brain.svg";
import { Box, Button, Typography, Grid } from "@mui/material";

function HeroSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <section
        id="hero"
        className="d-flex align-items-center container-fluid justify-content-center"
      >
        <Box
          className="container"
          data-aos="fade-up"
          sx={{
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid className="hero-container" container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
                width: { xs: "100%", md: "450px" }, // Fixed width for medium and larger screens
                mx: { xs: "auto", md: 0 }, // Center the text on small screens
              }}
            >
              <Typography
              
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                "Empowering Health"
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                <span>Through</span> Technology
              </Typography>
              <Typography
                className="hero-description"
                variant="body1"
                sx={{ fontSize: { xs: "0.5rem", md: "1rem" }, mt: 2 }}
              >
                embodies our brain tumor detection system's precision and
                efficiency. Utilizing AI for early, accurate diagnosis, it
                enhances patient outcomes by enabling timely, effective
                treatments, revolutionizing healthcare through advanced imaging
                analysis and informed decision-making.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  marginTop: 4,
                }}
              >
                <Button
                  onClick={scrollToTop}
                  component={Link}
                  to="/login"
                  variant="contained"
                  className="btn-create-account"
                  sx={{
                    fontSize: { xs: "0.5rem", md: "0.5rem" },
                    textTransform: "none",
                    "& .MuiButton-label": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={background}
                alt="Brain"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Box>
      </section>
    </Box>
  );
}

export default HeroSection;
