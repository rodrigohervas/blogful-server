
DROP TABLE IF EXISTS blogful_articles;

CREATE TABLE blogful_articles (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT,
    date_published TIMESTAMP DEFAULT now() NOT NULL
);


--execute: psql -U [DB-user] -d blogful -f ./scripts/create.blogful_articles.sqlz