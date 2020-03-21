alter table blogful_articles
    add column
        author integer references blogful_users(id)
            on delete set null;