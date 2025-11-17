import { useEffect, useState } from "react"
import {
  Box,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  Paper,
  Fade,
  Zoom,
  alpha,
  Stack,
  IconButton,
  Collapse,
  type SelectChangeEvent,
} from "@mui/material"
import {
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  EmojiObjects as HintsIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  SportsEsports as GameIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import {
  getChapters,
  getSubjects,
  getِAnsweredQuestions,
} from "../../../state/act/actAuth"
import { useTranslation } from "react-i18next"
import { HeadingElement } from "../../../styles/heading"

function AnsweredQuestions() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const {
    answeredQuestions,
    loadingAnsweredQuestions,
    grade,
    subjects,
    chapters,
    loadingGetSubjects,
  } = useAppSelector((state) => state.auth)
  const { mymode } = useAppSelector((state) => state.mode)

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedChapter, setSelectedChapter] = useState("")
  const [loadingGetChapters, setLoadingChapters] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  // Initial load
  useEffect(() => {
    if (grade) {
      dispatch(getSubjects({ grade: Number(grade) }))
    }
    dispatch(getِAnsweredQuestions({ subject: "", chapter: "" }))
  }, [dispatch, grade])

  // Handle subject change
  const handleSubjectChange = (event: SelectChangeEvent<string>) => {
    const subject = event.target.value
    setSelectedSubject(subject)
    setSelectedChapter("")
    setLoadingChapters(true)

    if (subject && grade) {
      dispatch(getChapters({ grade: Number(grade), subject }))
        .unwrap()
        .then(() => setLoadingChapters(false))
        .catch(() => setLoadingChapters(false))
    }

    dispatch(getِAnsweredQuestions({ subject, chapter: "" }))
  }

  // Handle chapter change
  const handleChapterChange = (event: SelectChangeEvent<string>) => {
    const chapter = event.target.value
    setSelectedChapter(chapter)
    setLoadingChapters(true)

    dispatch(getِAnsweredQuestions({ subject: selectedSubject, chapter }))
      .unwrap()
      .then(() => setLoadingChapters(false))
      .catch(() => setLoadingChapters(false))
  }

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedSubject("")
    setSelectedChapter("")
    dispatch(getِAnsweredQuestions({ subject: "", chapter: "" }))
  }

  // Toggle card expansion
  const toggleCardExpansion = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const hasActiveFilters = selectedSubject || selectedChapter
  const isDark = mymode === "dark"

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header with gradient */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <HeadingElement
              sx={{
                background: isDark
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
              }}
            >
              {t("answered-questions")}
            </HeadingElement>
            <Typography
              variant="subtitle1"
              sx={{
                color: isDark ? "text.secondary" : "white",
                textAlign: "center",
              }}
            >
              {t("review-your-progress")}
            </Typography>
          </Box>
        </Fade>

        {/* Filters Section with Glass Effect */}
        <Zoom in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              position: "sticky",
              top: 80,
              zIndex: 10,
              mb: 4,
              p: 3,
              borderRadius: 3,
              background: isDark
                ? alpha("#1e1e2e", 0.8)
                : alpha("#ffffff", 0.9),
              backdropFilter: "blur(50px)",
              border: `1px solid ${alpha(isDark ? "#fff" : "#000", 0.1)}`,
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <FilterListIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  {t("filters")}
                </Typography>
              </Stack>
              {hasActiveFilters && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ClearIcon />}
                  onClick={handleClearFilters}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {t("clear-filters")}
                </Button>
              )}
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12} md={selectedSubject ? 6 : 12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="subject-select-label">
                    {t("select-subject")}
                  </InputLabel>
                  <Select
                    labelId="subject-select-label"
                    value={selectedSubject}
                    label={t("select-subject")}
                    onChange={handleSubjectChange}
                    disabled={loadingGetSubjects}
                    sx={{
                      borderRadius: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(isDark ? "#fff" : "#000", 0.2),
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>{t("all-subjects")}</em>
                    </MenuItem>
                    {subjects?.map((subject) => (
                      <MenuItem
                        key={subject.subjectName}
                        value={subject.subjectName}
                      >
                        {subject.subjectName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {selectedSubject && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="chapter-select-label">
                      {t("select-chapter")}
                    </InputLabel>
                    <Select
                      labelId="chapter-select-label"
                      value={selectedChapter}
                      label={t("select-chapter")}
                      onChange={handleChapterChange}
                      disabled={loadingGetChapters || !selectedSubject}
                      sx={{
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: alpha(isDark ? "#fff" : "#000", 0.2),
                        },
                      }}
                      startAdornment={
                        loadingGetChapters && (
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                        )
                      }
                    >
                      <MenuItem value="">
                        <em>{t("all-chapters")}</em>
                      </MenuItem>
                      {chapters?.map((chapter) => (
                        <MenuItem key={chapter.number} value={chapter.name}>
                          {chapter.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {selectedSubject && (
                  <Chip
                    icon={<SchoolIcon />}
                    label={selectedSubject}
                    color="primary"
                    variant="filled"
                    onDelete={() => {
                      setSelectedSubject("")
                      setSelectedChapter("")
                      dispatch(
                        getِAnsweredQuestions({ subject: "", chapter: "" })
                      )
                    }}
                  />
                )}
                {selectedChapter && (
                  <Chip
                    icon={<MenuBookIcon />}
                    label={selectedChapter}
                    color="secondary"
                    variant="filled"
                    onDelete={() => {
                      setSelectedChapter("")
                      dispatch(
                        getِAnsweredQuestions({
                          subject: selectedSubject,
                          chapter: "",
                        })
                      )
                    }}
                  />
                )}
              </Box>
            )}
          </Paper>
        </Zoom>

        {/* Loading State */}
        {loadingAnsweredQuestions && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            py={8}
          >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="body1" sx={{ mt: 3, fontWeight: 500 }}>
              {t("loading-questions")}
            </Typography>
          </Box>
        )}

        {/* Questions Display */}
        {!loadingAnsweredQuestions && (
          <>
            {answeredQuestions && answeredQuestions.length > 0 ? (
              <Fade in timeout={1000}>
                <Box>
                  {/* Summary Stats */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 3,
                      borderRadius: 2,
                      background: isDark
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <CheckCircleIcon />
                      <Typography variant="h6" fontWeight={600}>
                        {t("total-questions")}: {answeredQuestions.length}
                      </Typography>
                    </Stack>
                  </Paper>

                  {/* Questions Grid */}
                  <Grid container spacing={3}>
                    {answeredQuestions.map((question, index) => (
                      <Grid item xs={12} key={index}>
                        <Zoom in timeout={300 + index * 50}>
                          <Paper
                            elevation={0}
                            sx={{
                              borderRadius: 3,
                              overflow: "hidden",
                              background: isDark
                                ? alpha("#1e1e2e", 0.6)
                                : alpha("#ffffff", 0.9),
                              border: `1px solid ${alpha(
                                isDark ? "#fff" : "#000",
                                0.1
                              )}`,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: isDark
                                  ? "0 12px 40px rgba(0, 0, 0, 0.5)"
                                  : "0 12px 40px rgba(0, 0, 0, 0.15)",
                              },
                            }}
                          >
                            <CardContent sx={{ p: 3 }}>
                              {/* Question Header */}
                              <Box
                                sx={{
                                  mb: 3,
                                  pb: 2,
                                  borderBottom: `2px solid ${alpha(
                                    isDark ? "#fff" : "#000",
                                    0.1
                                  )}`,
                                }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                >
                                  <Box>
                                    <Chip
                                      label={`${t("question")} ${index + 1}`}
                                      size="small"
                                      sx={{
                                        mb: 2,
                                        fontWeight: 700,
                                        background: isDark
                                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                          : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                        color: "white",
                                      }}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: 600,
                                        lineHeight: 1.6,
                                        mb: 1,
                                      }}
                                    >
                                      {question.questionText}
                                    </Typography>
                                  </Box>
                                  {question.hints &&
                                    question.hints.length > 0 && (
                                      <IconButton
                                        onClick={() =>
                                          toggleCardExpansion(index)
                                        }
                                        sx={{
                                          transform: expandedCards.has(index)
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                          transition: "transform 0.3s",
                                        }}
                                      >
                                        <ExpandMoreIcon />
                                      </IconButton>
                                    )}
                                </Stack>
                              </Box>

                              {/* Info Grid */}
                              <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} sm={6}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 2,
                                      borderRadius: 2,
                                      background: alpha("#4caf50", 0.1),
                                      border: `1px solid ${alpha(
                                        "#4caf50",
                                        0.3
                                      )}`,
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <CheckCircleIcon
                                        sx={{ color: "#4caf50", fontSize: 20 }}
                                      />
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                          fontWeight={600}
                                        >
                                          {t("correct-answer")}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          fontWeight={700}
                                        >
                                          {question.correctAnswer}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 2,
                                      borderRadius: 2,
                                      background: alpha("#2196f3", 0.1),
                                      border: `1px solid ${alpha(
                                        "#2196f3",
                                        0.3
                                      )}`,
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <GameIcon
                                        sx={{ color: "#2196f3", fontSize: 20 }}
                                      />
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                          fontWeight={600}
                                        >
                                          {t("game")}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          fontWeight={700}
                                        >
                                          {question.game}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 2,
                                      borderRadius: 2,
                                      background: alpha("#9c27b0", 0.1),
                                      border: `1px solid ${alpha(
                                        "#9c27b0",
                                        0.3
                                      )}`,
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <SchoolIcon
                                        sx={{ color: "#9c27b0", fontSize: 20 }}
                                      />
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                          fontWeight={600}
                                        >
                                          {t("subject")}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          fontWeight={700}
                                        >
                                          {question.subject}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 2,
                                      borderRadius: 2,
                                      background: alpha("#ff9800", 0.1),
                                      border: `1px solid ${alpha(
                                        "#ff9800",
                                        0.3
                                      )}`,
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <MenuBookIcon
                                        sx={{ color: "#ff9800", fontSize: 20 }}
                                      />
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                          fontWeight={600}
                                        >
                                          {t("chapter")}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          fontWeight={700}
                                        >
                                          {question.chapter}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Paper>
                                </Grid>
                              </Grid>

                              {/* Hints Section */}
                              {question.hints && question.hints.length > 0 && (
                                <Collapse in={expandedCards.has(index)}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      mt: 2,
                                      p: 2,
                                      borderRadius: 2,
                                      background: alpha("#ffc107", 0.1),
                                      border: `1px solid ${alpha(
                                        "#ffc107",
                                        0.3
                                      )}`,
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                      mb={1}
                                    >
                                      <HintsIcon sx={{ color: "#ffc107" }} />
                                      <Typography
                                        variant="subtitle2"
                                        fontWeight={700}
                                        color="#ffc107"
                                      >
                                        {t("hints")}
                                      </Typography>
                                    </Stack>
                                    <List dense>
                                      {question.hints.map((hint, hintIndex) => (
                                        <ListItem
                                          key={hintIndex}
                                          disableGutters
                                          sx={{
                                            pl: 2,
                                            "&::before": {
                                              content: '"•"',
                                              position: "absolute",
                                              left: 0,
                                              color: "#ffc107",
                                              fontWeight: "bold",
                                            },
                                          }}
                                        >
                                          <ListItemText
                                            primary={hint}
                                            sx={{
                                              "& .MuiListItemText-primary": {
                                                fontSize: "0.875rem",
                                                lineHeight: 1.6,
                                              },
                                            }}
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Paper>
                                </Collapse>
                              )}
                            </CardContent>
                          </Paper>
                        </Zoom>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            ) : (
              <Zoom in timeout={800}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    textAlign: "center",
                    borderRadius: 3,
                    background: isDark
                      ? alpha("#1e1e2e", 0.6)
                      : alpha("#ffffff", 0.9),
                    border: `1px solid ${alpha(isDark ? "#fff" : "#000", 0.1)}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto 24px",
                      borderRadius: "50%",
                      background: isDark
                        ? alpha("#667eea", 0.2)
                        : alpha("#667eea", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 40, color: "#667eea" }} />
                  </Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {t("no-questions-found")}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {t("try-adjusting-filters")}
                  </Typography>
                </Paper>
              </Zoom>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}

export default AnsweredQuestions
