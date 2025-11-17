import { Box, Typography, Chip, Fade, Stack } from "@mui/material"
import { useTranslation } from "react-i18next"
import { PlayerRow, RankBadge } from "../../styles/top10"
import { formatPoints, getRankIcon } from "../../utils/helperMethods"
import type { PlayerScore } from "../../utils/dataResponse"

interface PlayerRowProps {
  player: PlayerScore
  rank: number
  isCurrentUser: boolean
  delay: number
}

export const PlayerRowComponent: React.FC<PlayerRowProps> = ({
  player,
  rank,
  isCurrentUser,
  delay,
}) => {
  const { t } = useTranslation()
  return (
    <Fade in timeout={300 + delay * 100}>
      <PlayerRow rank={rank} isCurrentUser={isCurrentUser}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <RankBadge
              rank={rank}
              sx={{
                position: "relative",
                top: 0,
                left: 0,
                transform: "none",
                width: 48,
                height: 48,
                animation: "none",
              }}
            >
              {rank}
            </RankBadge>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {getRankIcon(rank)}
            </Box>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {player.name}
                </Typography>
                {isCurrentUser && (
                  <Chip
                    label={t("top10.you")}
                    color="primary"
                    size="small"
                    variant="filled"
                  />
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {t("top10.rank", { number: rank })}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {formatPoints(player.totalPoints)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("top10.points")}
            </Typography>
          </Box>
        </Stack>
      </PlayerRow>
    </Fade>
  )
}
