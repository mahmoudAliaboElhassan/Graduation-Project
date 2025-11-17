import {
  Box,
  CardContent,
  Typography,
  Chip,
  Zoom,
  useTheme,
} from "@mui/material"
import type { PlayerScore } from "../../utils/dataResponse"
import { PointsDisplay, RankBadge, TopPlayerCard } from "../../styles/top10"
import { formatPoints, getRankIcon } from "../../utils/helperMethods"
import { useTranslation } from "react-i18next"

interface TopPlayerCardProps {
  player: PlayerScore
  rank: number
  isCurrentUser: boolean
  delay: number
}

export const TopPlayerCardComponent: React.FC<TopPlayerCardProps> = ({
  player,
  rank,
  isCurrentUser,
  delay,
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Zoom in timeout={500 + delay * 200}>
      <Box sx={{ position: "relative", height: "100%" }}>
        <TopPlayerCard rank={rank}>
          <RankBadge rank={rank}>{rank}</RankBadge>
          <CardContent sx={{ pt: 4, textAlign: "center" }}>
            <Box sx={{ mb: 2 }}>{getRankIcon(rank)}</Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "black",
              }}
            >
              {player.name}
            </Typography>
            <PointsDisplay variant="h4">
              {formatPoints(player.totalPoints)}
            </PointsDisplay>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, mb: 2 }}
            >
              {t("top10.points")}
            </Typography>
            {isCurrentUser && (
              <Chip
                label={t("top10.you")}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontWeight: "bold",
                }}
              />
            )}
          </CardContent>
        </TopPlayerCard>
      </Box>
    </Zoom>
  )
}
