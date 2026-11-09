import { Component, inject, OnInit } from '@angular/core';
import { ReviewService } from '../../core/services/reviews/review-service';
import { AuthService } from '../../core/services/authService/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-about',
  imports: [CommonModule , FormsModule ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  

  private readonly reviewService = inject(ReviewService);
  private readonly authService = inject(AuthService);

 reviews: any[] = [
  { rating: 5, comment: 'Awesome!' },
  { rating: 3, comment: 'Good' }
];

  newReview = {
    rating: 5,
    comment: ''
  };

  averageRating = 0;

  ngOnInit(): void {
    // this.loadReviews();
  }

  // loadReviews() {
  //   this.reviewService.getAllReview().subscribe(res => {
  //     this.reviews = res;
  //     this.calculateAverageRating();
  //   });
  // }

  getStars(num: number): number[] {
  return Array(num).fill(0);
}


  calculateAverageRating() {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.averageRating = +(sum / this.reviews.length).toFixed(1);
  }

  // addReview() {
  //   if (!this.newReview.comment.trim()) return;

  //   this.reviewService.createOrUpdateReview(this.newReview).subscribe(() => {
  //     this.newReview.comment = '';
  //     this.newReview.rating = 5;
  //     this.loadReviews();
  //   });
  // }

  // deleteReview(id: number) {
  //   this.reviewService.deleteReview(id).subscribe(() => {
  //     this.loadReviews();
  //   });
  // }

}
