
export enum ReviewStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ReviewFeedback {
  suggestions: string[];
  overallAssessment: string;
}
