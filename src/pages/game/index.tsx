import { useTranslation } from "react-i18next"
import { Container } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useParams } from "react-router-dom"
import CardGame from "../../components/cardGame"
import { HeadingElement } from "../../styles/heading"
import UseGamesData from "../../hooks/use-game-data"
import { useAppSelector } from "../../hooks/redux"
import withGuard from "../../utils/withGuard"
import UseCategoryEntertainment from "../../hooks/use-category-entertainment"

function Games() {
  const { categoryGame } = useParams()
  const { categoriesEntertainment } = UseCategoryEntertainment()
  const selectedEntertainmentCategory =
    localStorage.getItem("entertainmentGameId") || "0"
  const entertainmentGame = categoriesEntertainment.find(
    (cat) => cat.value == selectedEntertainmentCategory
  )
  console.log("entertainment game", entertainmentGame?.text)
  const { t } = useTranslation()
  const { gamesData } = UseGamesData()
  const { role } = useAppSelector((state) => state.auth)

  const getHeadingText = () => {
    if (categoryGame === "entertainment" && entertainmentGame?.text) {
      return `${t("create-or-play")} ${entertainmentGame.text} ${t("game")}`
    }
    return role === "Teacher" || role === "Admin"
      ? t("select-game-create")
      : t("select-game-play")
  }

  return (
    <Container
      maxWidth="md"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid spacing={4} container>
        <Grid size={{ xs: 12 }}>
          <HeadingElement>{getHeadingText()}</HeadingElement>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <CardGame
            to={
              role === "Teacher" || role == "Admin"
                ? "/make-five-hints"
                : "five-hints"
            }
            data={gamesData[0]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <CardGame
            to={
              role === "Teacher" || role == "Admin"
                ? "/make-offside"
                : "offside"
            }
            data={gamesData[1]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <CardGame
            to={
              role == "Teacher" || role == "Admin"
                ? "/make-difficulty"
                : "difficulty"
            }
            data={gamesData[2]}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withGuard(Games)
