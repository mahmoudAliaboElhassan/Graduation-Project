import {
  EmojiEvents as TrophyIcon,
  WorkspacePremium as MedalIcon,
  Grade as StarIcon,
} from "@mui/icons-material"

export const getRankIcon = (rank: number): JSX.Element => {
  const iconProps = { sx: { fontSize: 32 } }
  switch (rank) {
    case 1:
      return (
        <TrophyIcon {...iconProps} sx={{ ...iconProps.sx, color: "#FFD700" }} />
      )
    case 2:
      return (
        <MedalIcon {...iconProps} sx={{ ...iconProps.sx, color: "#C0C0C0" }} />
      )
    case 3:
      return (
        <MedalIcon {...iconProps} sx={{ ...iconProps.sx, color: "#CD7F32" }} />
      )
    default:
      return (
        <StarIcon
          {...iconProps}
          sx={{ ...iconProps.sx, color: "primary.main" }}
        />
      )
  }
}

export const formatPoints = (points: number): string => points.toLocaleString()
