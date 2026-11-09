import { Component, inject, OnInit } from '@angular/core';
import { IReview } from '../../shared/interfaces/IAllReviewsAdmin';
import { ReviewService } from '../../core/services/reviews/review-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  imports: [CommonModule],
  templateUrl: './admin-reviews.html',
  styleUrl: './admin-reviews.scss',
})
export class AdminReviews implements OnInit{
  AllReviews: IReview[] = [];
  ngOnInit(): void {
    this.getReviews();
  }

  private reviewService=inject(ReviewService)
  getReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (res) => {
        this.AllReviews = res;
        console.log(this.AllReviews);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteReview(id: number) {
    this.reviewService.deleteReview(id).subscribe({
      next: (res) => {
        this.getReviews();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  

}