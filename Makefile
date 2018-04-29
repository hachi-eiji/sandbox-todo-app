.PHONY: reset_test_db
reset_test_db:
	sh ./scripts/reset_db.sh test

.PHONY: reset_db
reset_db:
	sh ./scripts/reset_db.sh
