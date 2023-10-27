import React from "react";

const StarsReview = ({rating}) => {
    const fullStars = (rating > 0 && rating <= 5) ? Math.floor(rating) : 0;
    const halfStars = (rating - fullStars > 0 && rating - fullStars < 1) ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
        <>
            {Array.from({length: fullStars}, (_, i) =>
                <small key={i} className="bi bi-star-fill"></small>
            )}

            {Array.from({length: halfStars}, (_, i) =>
                <small key={i} className="bi bi-star-half"></small>
            )}

            {Array.from({length: emptyStars}, (_, i) =>
                <small key={i} className="bi bi-star-fill star-gray"></small>
            )}
        </>
    );
}

export default StarsReview;