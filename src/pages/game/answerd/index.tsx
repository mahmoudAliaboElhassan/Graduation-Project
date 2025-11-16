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
  Divider,
  Button,
} from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import { SelectChangeEvent } from "@mui/material/Select"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import {
  getChapters,
  getSubjects,
  getِAnsweredQuestions,
} from "../../../state/act/actAuth"
import { useTranslation } from "react-i18next"
import { HeadingElement } from "../../../styles/heading"
import { CustomeCard } from "../../../styles/games/five-hints"

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

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedChapter, setSelectedChapter] = useState("")
  const [loadingGetChapters, setLoadingChapters] = useState(false)
  // Initial load
  useEffect(() => {
    if (grade) {
      dispatch(getSubjects({ grade: Number(grade) }))
    }
    // Load all answered questions initially
    dispatch(getِAnsweredQuestions({ subject: "", chapter: "" }))
  }, [dispatch, grade])

  // Handle subject change
  const handleSubjectChange = (event: SelectChangeEvent<string>) => {
    const subject = event.target.value
    setSelectedSubject(subject)
    setSelectedChapter("") // Reset chapter when subject changes
    setLoadingChapters(true)
    // Get chapters for the selected subject
    if (subject && grade) {
      dispatch(getChapters({ grade: Number(grade), subject }))
        .unwrap()
        .then(() => {
          setLoadingChapters(false)
        })
        .catch(() => setLoadingChapters(false))
    }

    // Get answered questions for the selected subject
    dispatch(getِAnsweredQuestions({ subject, chapter: "" }))
  }

  // Handle chapter change
  const handleChapterChange = (event: SelectChangeEvent<string>) => {
    const chapter = event.target.value
    setSelectedChapter(chapter)
    setLoadingChapters(true)
    // Get answered questions for the selected subject and chapter
    dispatch(getِAnsweredQuestions({ subject: selectedSubject, chapter }))
      .unwrap()
      .then(() => {
        setLoadingChapters(false)
      })
      .catch(() => setLoadingChapters(false))
  }
  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedSubject("")
    setSelectedChapter("")
    // Load all answered questions
    dispatch(getِAnsweredQuestions({ subject: "", chapter: "" }))
  }
  const hasActiveFilters = selectedSubject || selectedChapter

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Filters Section */}{" "}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          pb: 2,
          mb: 2,
        }}
      >
        <HeadingElement>{t("answered-questions")}</HeadingElement>
        <CustomeCard sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">{t("filters")}</Typography>
            {hasActiveFilters && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                size="small"
              >
                {t("clear-filters")}
              </Button>
            )}
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={selectedSubject ? 6 : 12}>
              <FormControl fullWidth>
                <InputLabel id="subject-select-label">
                  {t("select-subject")}
                </InputLabel>
                <Select
                  labelId="subject-select-label"
                  value={selectedSubject}
                  label={t("select-subject")}
                  onChange={handleSubjectChange}
                  disabled={loadingGetSubjects}
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
                <FormControl fullWidth>
                  <InputLabel id="chapter-select-label">
                    {t("select-chapter")}
                  </InputLabel>
                  <Select
                    labelId="chapter-select-label"
                    value={selectedChapter}
                    label={t("select-chapter")}
                    onChange={handleChapterChange}
                    disabled={loadingGetChapters || !selectedSubject}
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
        </CustomeCard>
      </Box>
      {/* Loading State */}
      {loadingAnsweredQuestions && (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            {t("loading-questions")}
          </Typography>
        </Box>
      )}
      {/* Questions Display */}
      {!loadingAnsweredQuestions && (
        <>
          {answeredQuestions && answeredQuestions.length > 0 ? (
            <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                {t("total-questions")}: {answeredQuestions.length}
              </Typography>
              <Grid container spacing={3}>
                {answeredQuestions.map((question, index) => (
                  <Grid item xs={12} key={index}>
                    <CustomeCard>
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {t("question")} {index + 1}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ mb: 2, lineHeight: 1.6 }}
                          >
                            {question.questionText}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                gutterBottom
                              >
                                {t("correct-answer")}:
                              </Typography>
                              <Chip
                                label={question.correctAnswer}
                                color="success"
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                gutterBottom
                              >
                                {t("game")}:
                              </Typography>
                              <Chip
                                label={question.game}
                                color="info"
                                variant="outlined"
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                gutterBottom
                              >
                                {t("subject")}:
                              </Typography>
                              <Chip
                                label={question.subject}
                                color="primary"
                                variant="filled"
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                gutterBottom
                              >
                                {t("chapter")}:
                              </Typography>
                              <Chip
                                label={question.chapter}
                                color="secondary"
                                variant="filled"
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {question.hints && question.hints.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography
                              variant="subtitle2"
                              color="primary"
                              gutterBottom
                            >
                              {t("hints")}:
                            </Typography>
                            <List dense>
                              {question.hints.map((hint, hintIndex) => (
                                <ListItem key={hintIndex} disableGutters>
                                  <ListItemText
                                    primary={`${hintIndex + 1}. ${hint}`}
                                    sx={{
                                      "& .MuiListItemText-primary": {
                                        fontSize: "0.875rem",
                                        color: "text.secondary",
                                      },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                      </CardContent>
                    </CustomeCard>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <CustomeCard elevation={1} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                {t("no-questions-found")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t("try-adjusting-filters")}
              </Typography>
            </CustomeCard>
          )}
        </>
      )}
    </Container>
  )
}

export default AnsweredQuestions
