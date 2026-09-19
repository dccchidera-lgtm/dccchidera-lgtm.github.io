# Restaurant service mix | independent public-data project

**Business question:** How do average bill size and bill per cover differ between lunch and dinner in a small public restaurant sample, and what more would an operator need before changing staffing or offers?

**Source:** Plotly Express `tips` educational sample: 244 restaurant bills. [Plotly dataset documentation](https://plotly.github.io/plotly.py-docs/generated/plotly.express.data.html) and [public CSV](https://github.com/plotly/datasets/blob/master/tips.csv). Data are bundled with Plotly; this is NOT employer or MSc assessed coursework.

## Reproduce

```bash
python -m pip install -r requirements.txt
python analyse.py
python -m unittest discover -s tests -v
```

No network calls at analysis time. The script validates shape, completeness, ranges and labels; derives tip-to-bill ratio and bill per cover; groups by lunch/dinner; then writes `output/summary.csv` and `output/service_period.png`.

## Observed descriptive results

| Service | Bills | Mean bill | Mean bill per cover | Mean tip | Median tip rate |
| --- | ---: | ---: | ---: | ---: | ---: |
| Lunch | 68 | 17.17 | 7.32 | 2.73 | 15.4% |
| Dinner | 176 | 20.80 | 8.11 | 3.10 | 15.5% |

Currency and profit margins are not identified by this educational sample. Different numbers of lunch and dinner observations matter. These are descriptive comparisons, not proof that shifting labour or offers increases profit.

**Decision implication:** Before changing a rota or promotion, collect representative hourly order counts, cover counts, average check, contribution margin and labour costs across multiple weeks; then test decisions against this stronger evidence.

**Attribution:** Independent analysis and narrative by Daniel Christopher. Public example dataset supplied by Plotly.
