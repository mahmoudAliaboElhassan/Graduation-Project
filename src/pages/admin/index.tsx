"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Container,
  TablePagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  approveQuestion,
  getAllQuestions,
  rejectQuestion,
} from "../../state/act/actAdmin";

interface Question {
  questionID: number;
  chapterName: string;
  gradeName: string;
  subjectName: string;
  answer: string;
  summary: string;
  game: string;
  hints: string[];
}

const AdminDashboard = () => {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();

  // Redux state
  const { questions, loadinGetQuestions, error } = useAppSelector(
    (state) => state.admin
  );

  // Local state
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [gameFilter, setGameFilter] = useState("");

  // Fetch questions on component mount
  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  // Filter questions based on search and filters
  const filteredQuestions =
    questions?.filter((question: Question) => {
      const matchesSearch =
        question.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.chapterName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGrade = !gradeFilter || question.gradeName === gradeFilter;
      const matchesSubject =
        !subjectFilter || question.subjectName === subjectFilter;
      const matchesGame = !gameFilter || question.game === gameFilter;

      return matchesSearch && matchesGrade && matchesSubject && matchesGame;
    }) || [];

  // Get unique values for filters
  const uniqueGrades = Array.from(
    new Set(questions?.map((q: Question) => q.gradeName) || [])
  );
  const uniqueSubjects = Array.from(
    new Set(questions?.map((q: Question) => q.subjectName) || [])
  );
  const uniqueGames = Array.from(
    new Set(questions?.map((q: Question) => q.game) || [])
  );

  // Handle view question details
  const handleViewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setViewDialogOpen(true);
  };

  // Handle approve/reject confirmation
  const handleActionClick = (
    question: Question,
    action: "approve" | "reject"
  ) => {
    setSelectedQuestion(question);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  // Execute approve/reject action
  const handleConfirmAction = async () => {
    if (!selectedQuestion || !actionType) return;

    setActionLoading(selectedQuestion.questionID);

    try {
      if (actionType === "approve") {
        await dispatch(
          approveQuestion({ questionId: selectedQuestion.questionID })
        ).unwrap();
        toast.success(t("admin.questionApproved"));
      } else {
        await dispatch(
          rejectQuestion({ questionId: selectedQuestion.questionID })
        ).unwrap();
        toast.success(t("admin.questionRejected"));
      }

      // Refresh questions list
      dispatch(getAllQuestions());
    } catch (error: any) {
      toast.error(t("admin.actionFailed"));
      console.error("Action failed:", error);
    } finally {
      setActionLoading(null);
      setConfirmDialogOpen(false);
      setSelectedQuestion(null);
      setActionType(null);
    }
  };

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setGradeFilter("");
    setSubjectFilter("");
    setGameFilter("");
    setPage(0);
  };

  if (loadinGetQuestions && !questions?.length) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("admin.dashboard.title")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("admin.dashboard.description")}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {t("admin.errorLoadingQuestions")}
        </Alert>
      )}

      {/* Filters and Search */}
      <Paper sx={{ mb: 3 }}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 2, py: 2 }}>
          <TextField
            size="small"
            placeholder={t("admin.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t("admin.grade")}</InputLabel>
            <Select
              value={gradeFilter}
              label={t("admin.grade")}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <MenuItem value="">{t("admin.all")}</MenuItem>
              {uniqueGrades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t("admin.subject")}</InputLabel>
            <Select
              value={subjectFilter}
              label={t("admin.subject")}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <MenuItem value="">{t("admin.all")}</MenuItem>
              {uniqueSubjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>{t("admin.gameType")}</InputLabel>
            <Select
              value={gameFilter}
              label={t("admin.gameType")}
              onChange={(e) => setGameFilter(e.target.value)}
            >
              <MenuItem value="">{t("admin.all")}</MenuItem>
              {uniqueGames.map((game) => (
                <MenuItem key={game} value={game}>
                  {game}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<FilterIcon />}
          >
            {t("admin.clearFilters")}
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="body2" color="text.secondary">
            {t("admin.totalQuestions", { count: filteredQuestions.length })}
          </Typography>
        </Toolbar>
      </Paper>

      {/* Questions Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("admin.questionId")}</TableCell>
                <TableCell>{t("admin.chapter")}</TableCell>
                <TableCell>{t("admin.grade")}</TableCell>
                <TableCell>{t("admin.subject")}</TableCell>
                <TableCell>{t("admin.gameType")}</TableCell>
                <TableCell>{t("admin.answer")}</TableCell>
                <TableCell align="center">{t("admin.actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuestions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question: Question) => (
                  <TableRow key={question.questionID} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        #{question.questionID}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {question.chapterName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={question.gradeName}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={question.subjectName}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={question.game}
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {question.answer}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title={t("admin.viewDetails")}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewQuestion(question)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={t("admin.approve")}>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() =>
                              handleActionClick(question, "approve")
                            }
                            disabled={actionLoading === question.questionID}
                          >
                            {actionLoading === question.questionID ? (
                              <CircularProgress size={20} />
                            ) : (
                              <ApproveIcon />
                            )}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={t("admin.reject")}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              handleActionClick(question, "reject")
                            }
                            disabled={actionLoading === question.questionID}
                          >
                            {actionLoading === question.questionID ? (
                              <CircularProgress size={20} />
                            ) : (
                              <RejectIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredQuestions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* View Question Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t("admin.questionDetails")} #{selectedQuestion?.questionID}
        </DialogTitle>
        <DialogContent>
          {selectedQuestion && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" gutterBottom>
                {t("admin.basicInfo")}
              </Typography>
              <Box
                sx={{
                  mb: 3,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("admin.chapter")}
                  </Typography>
                  <Typography variant="body1">
                    {selectedQuestion.chapterName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("admin.grade")}
                  </Typography>
                  <Typography variant="body1">
                    {selectedQuestion.gradeName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("admin.subject")}
                  </Typography>
                  <Typography variant="body1">
                    {selectedQuestion.subjectName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {t("admin.gameType")}
                  </Typography>
                  <Typography variant="body1">
                    {selectedQuestion.game}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>
                {t("admin.questionContent")}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t("admin.answer")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}
                >
                  {selectedQuestion.answer}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t("admin.summary")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}
                >
                  {selectedQuestion.summary}
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                {t("admin.hints")}
              </Typography>
              <List dense>
                {selectedQuestion.hints.map((hint, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={`${t("admin.hint")} ${index + 1}: ${hint}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>
            {t("admin.close")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>
          {actionType === "approve"
            ? t("admin.confirmApprove")
            : t("admin.confirmReject")}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {actionType === "approve"
              ? t("admin.approveMessage", { id: selectedQuestion?.questionID })
              : t("admin.rejectMessage", { id: selectedQuestion?.questionID })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>
            {t("admin.cancel")}
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={actionType === "approve" ? "success" : "error"}
            variant="contained"
          >
            {actionType === "approve" ? t("admin.approve") : t("admin.reject")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
