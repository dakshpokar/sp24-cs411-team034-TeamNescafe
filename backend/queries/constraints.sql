alter table
    reviews
add
    constraint review_length check (length(comment) < 250);