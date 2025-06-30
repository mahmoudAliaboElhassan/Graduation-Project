import React from "react";
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
  useTheme,
} from "@mui/material";
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  approveQuestion,
  getEntertainmentQuestions,
  rejectQuestion,
} from "../../../state/act/actAdmin";
import withGuard from "../../../utils/withGuard";
import UseCategoryEntertainment from "../../../hooks/use-category-entertainment";

interface Question {
  questionID: number;
  question: string;
  answer: string;
  section: number;
  summary: string;
  game: string;
  hints: string[];
}

const EntertainmentQuestions = () => {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { categoriesEntertainment } = UseCategoryEntertainment();

  const getSection = (question: Question): string | undefined => {
    const selected = categoriesEntertainment.find(
      (cat) => Number(cat.value) === question.section
    );
    return selected?.text || `Section ${question.section}`;
  };

  // Redux state
  const { EntertainmentQuestions, loadinGetQuestions, error } = useAppSelector(
    (state) => state.admin
  );
  const { mymode } = useAppSelector((state) => state.mode);

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
  const [sectionFilter, setSectionFilter] = useState("");
  const [gameFilter, setGameFilter] = useState("");

  // Fetch questions on component mount
  useEffect(() => {
    dispatch(getEntertainmentQuestions());
  }, [dispatch]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [searchTerm, sectionFilter, gameFilter]);

  // Filter questions based on search and filters with better error handling
  const filteredQuestions = React.useMemo(() => {
    if (!EntertainmentQuestions || !Array.isArray(EntertainmentQuestions)) {
      return [];
    }

    return EntertainmentQuestions.filter((question: Question) => {
      // Safety checks for undefined values
      if (!question) return false;

      // Search term matching with null safety
      const matchesSearch =
        !searchTerm ||
        [
          question.question,
          question.answer,
          question.summary,
          getSection(question),
        ].some(
          (field) =>
            field &&
            field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Section filter matching
      const matchesSection =
        !sectionFilter || question.section?.toString() === sectionFilter;

      // Game filter matching
      const matchesGame = !gameFilter || question.game === gameFilter;

      return matchesSearch && matchesSection && matchesGame;
    });
  }, [
    EntertainmentQuestions,
    searchTerm,
    sectionFilter,
    gameFilter,
    categoriesEntertainment,
  ]);

  // Get unique values for filters with better error handling
  const uniqueSections = React.useMemo(() => {
    if (!EntertainmentQuestions || !Array.isArray(EntertainmentQuestions)) {
      return [];
    }
    return Array.from(
      new Set(
        EntertainmentQuestions.map((q: Question) =>
          q?.section?.toString()
        ).filter(Boolean)
      )
    ).sort();
  }, [EntertainmentQuestions]);

  const uniqueGames = React.useMemo(() => {
    if (!EntertainmentQuestions || !Array.isArray(EntertainmentQuestions)) {
      return [];
    }
    return Array.from(
      new Set(
        EntertainmentQuestions.map((q: Question) => q?.game).filter(Boolean)
      )
    ).sort();
  }, [EntertainmentQuestions]);

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
      setConfirmDialogOpen(false);
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
      dispatch(getEntertainmentQuestions());
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
    setSectionFilter("");
    setGameFilter("");
    setPage(0);
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || sectionFilter || gameFilter;

  const paperStyle = {
    backgroundColor:
      mymode === "light"
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(26, 26, 46, 0.95)",
    backdropFilter: "blur(10px)",
    border:
      mymode === "light"
        ? "1px solid rgba(255, 255, 255, 0.2)"
        : "1px solid rgba(75, 0, 15, 0.3)",
    boxShadow:
      mymode === "light"
        ? "0 8px 32px rgba(195, 20, 50, 0.1)"
        : "0 8px 32px rgba(26, 26, 46, 0.3)",
  };

  const dialogStyle = {
    "& .MuiDialog-paper": {
      backgroundColor:
        mymode === "light"
          ? "rgba(255, 255, 255, 0.98)"
          : "rgba(26, 26, 46, 0.98)",
      backdropFilter: "blur(20px)",
      border:
        mymode === "light"
          ? "1px solid rgba(195, 20, 50, 0.2)"
          : "1px solid rgba(75, 0, 15, 0.3)",
    },
  };

  if (loadinGetQuestions && !EntertainmentQuestions?.length) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress
            size={60}
            sx={{
              color: mymode === "light" ? "#c31432" : "#ff6b9d",
            }}
          />{" "}
          <Typography
            variant="body1"
            sx={{
              color: mymode === "light" ? "#c31432" : "#ff6b9d",
              fontWeight: "bold",
            }}
          >
            {t("loading-entertainment")}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: mymode === "light" ? "#ffffff" : "#ffffff",
            fontWeight: "bold",
            textShadow:
              mymode === "light"
                ? "2px 2px 4px rgba(0,0,0,0.3)"
                : "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {t("admin.entertainment.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color:
              mymode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(255, 255, 255, 0.8)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {t("admin.entertainment.description")}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            backgroundColor:
              mymode === "light"
                ? "rgba(211, 47, 47, 0.9)"
                : "rgba(183, 28, 28, 0.9)",
            color: "#ffffff",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
          }}
        >
          {t("admin.errorLoadingQuestions")}
        </Alert>
      )}

      {/* Enhanced Filters and Search */}
      <Paper sx={{ mb: 3, ...paperStyle }}>
        <Toolbar sx={{ flexWrap: "wrap", gap: 2, py: 2 }}>
          <TextField
            size="small"
            placeholder={t("admin.searchPlaceholder") || "Search questions..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm("")}
                    sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.3)"
                      : "rgba(255, 107, 157, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
                "&.Mui-focused fieldset": {
                  borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel
              sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
            >
              {t("questionCreation.steps.section") || "Section"}
            </InputLabel>
            <Select
              value={sectionFilter}
              label={t("questionCreation.labels.section") || "Section"}
              onChange={(e) => setSectionFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.3)"
                      : "rgba(255, 107, 157, 0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
              }}
            >
              <MenuItem value="">{t("admin.all") || "All"}</MenuItem>
              {uniqueSections.map((section) => (
                <MenuItem key={section} value={section}>
                  {categoriesEntertainment.find((cat) => cat.value === section)
                    ?.text || `Section ${section}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel
              sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
            >
              {t("admin.gameType") || "Game Type"}
            </InputLabel>
            <Select
              value={gameFilter}
              label={t("admin.gameType") || "Game Type"}
              onChange={(e) => setGameFilter(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    mymode === "light"
                      ? "rgba(195, 20, 50, 0.3)"
                      : "rgba(255, 107, 157, 0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
                },
              }}
            >
              <MenuItem value="">{t("admin.all") || "All"}</MenuItem>
              {uniqueGames.map((game) => (
                <MenuItem key={game} value={game}>
                  {game}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant={hasActiveFilters ? "contained" : "outlined"}
            onClick={handleClearFilters}
            startIcon={<FilterIcon />}
            disabled={!hasActiveFilters}
            sx={{
              borderColor: mymode === "light" ? "#c31432" : "#ff6b9d",
              color: hasActiveFilters
                ? "#ffffff"
                : mymode === "light"
                ? "#c31432"
                : "#ff6b9d",
              backgroundColor: hasActiveFilters
                ? mymode === "light"
                  ? "#c31432"
                  : "#ff6b9d"
                : "transparent",
              "&:hover": {
                borderColor: mymode === "light" ? "#a01729" : "#ff4081",
                backgroundColor: hasActiveFilters
                  ? mymode === "light"
                    ? "#a01729"
                    : "#ff4081"
                  : mymode === "light"
                  ? "rgba(195, 20, 50, 0.1)"
                  : "rgba(255, 107, 157, 0.1)",
              },
              "&:disabled": {
                opacity: 0.5,
              },
            }}
          >
            {t("admin.clearFilters") || "Clear Filters"}
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color:
                  mymode === "light"
                    ? "rgba(0, 0, 0, 0.7)"
                    : "rgba(255, 255, 255, 0.7)",
              }}
            >
              {t("admin.totalQuestions", { count: filteredQuestions.length }) ||
                `Total: ${filteredQuestions.length} questions`}
            </Typography>
            {hasActiveFilters && (
              <Typography
                variant="caption"
                sx={{
                  color: mymode === "light" ? "#c31432" : "#ff6b9d",
                  fontWeight: "bold",
                }}
              >
                (Filtered from {EntertainmentQuestions?.length || 0})
              </Typography>
            )}
          </Box>
        </Toolbar>

        {/* Active filters indicator */}
        {hasActiveFilters && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              Active filters:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  size="small"
                  onDelete={() => setSearchTerm("")}
                  color="primary"
                />
              )}
              {sectionFilter && (
                <Chip
                  label={`Section: ${
                    categoriesEntertainment.find(
                      (cat) => cat.value === sectionFilter
                    )?.text || sectionFilter
                  }`}
                  size="small"
                  onDelete={() => setSectionFilter("")}
                  color="primary"
                />
              )}
              {gameFilter && (
                <Chip
                  label={`Game: ${gameFilter}`}
                  size="small"
                  onDelete={() => setGameFilter("")}
                  color="primary"
                />
              )}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Questions Table */}
      <Paper sx={paperStyle}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    borderBottom: `2px solid ${
                      mymode === "light" ? "#c31432" : "#ff6b9d"
                    }`,
                  }}
                >
                  {t("admin.questionId") || "ID"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    borderBottom: `2px solid ${
                      mymode === "light" ? "#c31432" : "#ff6b9d"
                    }`,
                  }}
                >
                  {t("questionCreation.labels.question") || "Question"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    borderBottom: `2px solid ${
                      mymode === "light" ? "#c31432" : "#ff6b9d"
                    }`,
                  }}
                >
                  {t("questionCreation.labels.section") || "Section"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    borderBottom: `2px solid ${
                      mymode === "light" ? "#c31432" : "#ff6b9d"
                    }`,
                  }}
                >
                  {t("admin.gameType") || "Game Type"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    borderBottom: `2px solid ${
                      mymode === "light" ? "#c31432" : "#ff6b9d"
                    }`,
                  }}
                >
                  {t("admin.answer") || "Answer"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: mymode === "light" ? "#c31432" : "#ff6b9d",
                    borderBottom: `2px solid ${
                      mymode === "light" ? "#c31432" : "#ff6b9d"
                    }`,
                  }}
                >
                  {t("admin.actions") || "Actions"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {hasActiveFilters
                        ? "No questions match your current filters"
                        : "No questions available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuestions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((question: Question) => (
                    <TableRow
                      key={question.questionID}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            mymode === "light"
                              ? "rgba(195, 20, 50, 0.05)"
                              : "rgba(255, 107, 157, 0.05)",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          #{question.questionID}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {question.question}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getSection(question)}
                          size="small"
                          sx={{
                            backgroundColor:
                              mymode === "light"
                                ? "rgba(195, 20, 50, 0.1)"
                                : "rgba(255, 107, 157, 0.1)",
                            color: mymode === "light" ? "#c31432" : "#ff6b9d",
                            border: `1px solid ${
                              mymode === "light" ? "#c31432" : "#ff6b9d"
                            }`,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={question.game}
                          size="small"
                          sx={{
                            backgroundColor:
                              mymode === "light"
                                ? "rgba(75, 0, 15, 0.1)"
                                : "rgba(75, 0, 15, 0.3)",
                            color: mymode === "light" ? "#4b000f" : "#ff9999",
                            border: `1px solid ${
                              mymode === "light" ? "#4b000f" : "#ff9999"
                            }`,
                          }}
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
                          <Tooltip
                            title={t("admin.viewDetails") || "View Details"}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleViewQuestion(question)}
                              sx={{
                                color:
                                  mymode === "light" ? "#c31432" : "#ff6b9d",
                                "&:hover": {
                                  backgroundColor:
                                    mymode === "light"
                                      ? "rgba(195, 20, 50, 0.1)"
                                      : "rgba(255, 107, 157, 0.1)",
                                },
                              }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title={t("admin.approve") || "Approve"}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleActionClick(question, "approve")
                              }
                              disabled={actionLoading === question.questionID}
                              sx={{
                                color: "#4caf50",
                                "&:hover": {
                                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                                },
                              }}
                            >
                              {actionLoading === question.questionID ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "#4caf50" }}
                                />
                              ) : (
                                <ApproveIcon />
                              )}
                            </IconButton>
                          </Tooltip>

                          <Tooltip title={t("admin.reject") || "Reject"}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleActionClick(question, "reject")
                              }
                              disabled={actionLoading === question.questionID}
                              sx={{
                                color: "#f44336",
                                "&:hover": {
                                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                                },
                              }}
                            >
                              {actionLoading === question.questionID ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "#f44336" }}
                                />
                              ) : (
                                <RejectIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
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
          sx={{
            borderTop: `1px solid ${
              mymode === "light"
                ? "rgba(195, 20, 50, 0.2)"
                : "rgba(255, 107, 157, 0.2)"
            }`,
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                color:
                  mymode === "light"
                    ? "rgba(0, 0, 0, 0.7)"
                    : "rgba(255, 255, 255, 0.7)",
              },
          }}
        />
      </Paper>

      {/* View Question Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        sx={dialogStyle}
      >
        <DialogTitle
          sx={{
            color: mymode === "light" ? "#c31432" : "#ff6b9d",
            borderBottom: `1px solid ${
              mymode === "light"
                ? "rgba(195, 20, 50, 0.2)"
                : "rgba(255, 107, 157, 0.2)"
            }`,
          }}
        >
          {t("admin.questionDetails")} #{selectedQuestion?.questionID}
        </DialogTitle>
        <DialogContent>
          {selectedQuestion && (
            <Box sx={{ pt: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
              >
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
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        mymode === "light"
                          ? "rgba(0, 0, 0, 0.6)"
                          : "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {t("questionCreation.labels.section")}
                  </Typography>
                  <Typography variant="body1">
                    {getSection(selectedQuestion)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        mymode === "light"
                          ? "rgba(0, 0, 0, 0.6)"
                          : "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {t("admin.gameType")}
                  </Typography>
                  <Typography variant="body1">
                    {selectedQuestion.game}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
              >
                {t("admin.questionContent")}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    color:
                      mymode === "light"
                        ? "rgba(0, 0, 0, 0.6)"
                        : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {t("questionCreation.labels.question")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor:
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.1)"
                        : "rgba(26, 26, 46, 0.5)",
                    borderRadius: 1,
                    border: `1px solid ${
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.2)"
                        : "rgba(255, 107, 157, 0.2)"
                    }`,
                  }}
                >
                  {selectedQuestion.question}
                </Typography>

                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    color:
                      mymode === "light"
                        ? "rgba(0, 0, 0, 0.6)"
                        : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {t("admin.answer")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor:
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.1)"
                        : "rgba(26, 26, 46, 0.5)",
                    borderRadius: 1,
                    border: `1px solid ${
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.2)"
                        : "rgba(255, 107, 157, 0.2)"
                    }`,
                  }}
                >
                  {selectedQuestion.answer}
                </Typography>

                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    color:
                      mymode === "light"
                        ? "rgba(0, 0, 0, 0.6)"
                        : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {t("admin.summary")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor:
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.1)"
                        : "rgba(26, 26, 46, 0.5)",
                    borderRadius: 1,
                    border: `1px solid ${
                      mymode === "light"
                        ? "rgba(195, 20, 50, 0.2)"
                        : "rgba(255, 107, 157, 0.2)"
                    }`,
                  }}
                >
                  {selectedQuestion.summary}
                </Typography>
              </Box>
              {selectedQuestion.hints.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: mymode === "light" ? "#c31432" : "#ff6b9d" }}
                  >
                    {t("admin.hints")}
                  </Typography>
                  <List dense>
                    {selectedQuestion.hints.map((hint, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: 0.5,
                          backgroundColor:
                            mymode === "light"
                              ? "rgba(195, 20, 50, 0.05)"
                              : "rgba(255, 107, 157, 0.05)",
                          mb: 1,
                          borderRadius: 1,
                          border: `1px solid ${
                            mymode === "light"
                              ? "rgba(195, 20, 50, 0.1)"
                              : "rgba(255, 107, 157, 0.1)"
                          }`,
                        }}
                      >
                        <ListItemText
                          primary={`${t("admin.hint")} ${index + 1}: ${hint}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: `1px solid ${
              mymode === "light"
                ? "rgba(195, 20, 50, 0.2)"
                : "rgba(255, 107, 157, 0.2)"
            }`,
          }}
        >
          <Button
            onClick={() => setViewDialogOpen(false)}
            sx={{
              color: mymode === "light" ? "#c31432" : "#ff6b9d",
              "&:hover": {
                backgroundColor:
                  mymode === "light"
                    ? "rgba(195, 20, 50, 0.1)"
                    : "rgba(255, 107, 157, 0.1)",
              },
            }}
          >
            {t("admin.close")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        sx={dialogStyle}
      >
        <DialogTitle
          sx={{
            color: mymode === "light" ? "#c31432" : "#ff6b9d",
            borderBottom: `1px solid ${
              mymode === "light"
                ? "rgba(195, 20, 50, 0.2)"
                : "rgba(255, 107, 157, 0.2)"
            }`,
          }}
        >
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
        <DialogActions
          sx={{
            borderTop: `1px solid ${
              mymode === "light"
                ? "rgba(195, 20, 50, 0.2)"
                : "rgba(255, 107, 157, 0.2)"
            }`,
          }}
        >
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            sx={{
              color:
                mymode === "light"
                  ? "rgba(0, 0, 0, 0.6)"
                  : "rgba(255, 255, 255, 0.6)",
              "&:hover": {
                backgroundColor:
                  mymode === "light"
                    ? "rgba(0, 0, 0, 0.05)"
                    : "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            {t("admin.cancel")}
          </Button>
          <Button
            onClick={handleConfirmAction}
            variant="contained"
            sx={{
              backgroundColor: actionType === "approve" ? "#4caf50" : "#f44336",
              "&:hover": {
                backgroundColor:
                  actionType === "approve" ? "#45a049" : "#da190b",
              },
            }}
          >
            {actionType === "approve" ? t("admin.approve") : t("admin.reject")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default withGuard(EntertainmentQuestions);
