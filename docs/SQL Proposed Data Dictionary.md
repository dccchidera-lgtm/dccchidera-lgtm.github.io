# Proposed SQL data dictionary | MSc Data Management team assignment

**Status:** Diagram-derived from the team's original six-table ERD. Not an original SQL DDL script; data types, nullability, indexes and constraints beyond the drawn key symbols are not documented and are not invented. Not a production Uber Eats schema.

| Proposed table | Fields visible in the submitted ERD |
| --- | --- |
| Location | **location_number (PK)**, location_name, street_address, city, state, zip_code, latitude, longitude |
| Delivery | **delivery_id (PK)**, location_number (FK to Location), delivery_fee, recorded_at |
| Promotion | **promotion_id (PK)**, location_number (FK), promotion_text, recorded_at |
| Status | **status_id (PK)**, location_number (FK), is_open, recorded_at |
| Reviews | **review_id (PK)**, location_number (FK), review_count, review_rating, recorded_at |
| Scan | **scan_id (PK)**, location_number (FK), scan_date |

**Data-quality finding:** The team's submitted 1,000-record source analysis found missing delivery-fee values in 997 records (99.7%) and absent promotion values in 890 (89%). These are source-dataset statistics, not production-system findings.

**Provenance:** Proposed relational schema embedded in the submitted `Data Management - (Group Assignment).docx`. Four-person team. The original executable `.sql` files have not been recovered in the seven-file archive or the currently accessible Google Drive/Gmail searches; this dictionary must not be misrepresented as executable SQL.
