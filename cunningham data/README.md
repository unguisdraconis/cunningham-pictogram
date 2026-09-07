# Cunningham source data

## Preserved source artifacts

These files are preserved copies of the dataset:

> Clarisse Bardiot. *Merce Cunningham*. Version 1. Zenodo. Published April 28, 2020. [doi:10.5281/zenodo.3774548](https://doi.org/10.5281/zenodo.3774548).

The dataset is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

Although their filenames use the `.csv` extension, both files are tab-delimited.

| File | Size | MD5 | SHA-256 | Preserved filesystem timestamp |
| --- | ---: | --- | --- | --- |
| `donnees-danseurs.csv` | 3,975 bytes | `6df22832d9cf076bd9956170dcc1e7e0` | `48c16d7c453a00927c2a54bb6859364ca012aacf74d9e9b295e1d87e7ffe4f52` | `2026-02-22T07:45:34.8777546-05:00` |
| `donnees-cunningham.csv` | 61,685 bytes | `2fa9f8a4ab76d5a8c3fe163aa11e1709` | `9b922c8447c68e067e131cfdb5a5a99514047ecc7f655e1d5b59ea79eb2c0ca3` | `2026-02-22T07:46:14.3001736-05:00` |

The sizes and MD5 values are identical to the Version 1 files served by Zenodo. The timestamps above are the filesystem timestamps preserved on the copies supplied to this repository; no separate acquisition log is available.

## Historical application aggregate

The application does not parse these files. It renders a manually embedded decade-level aggregate in `src/App.jsx`, and the original procedure used to derive that aggregate is not preserved as executable code.

In particular, `donnees-danseurs.csv` contains only `Nom`, `in`, and `out` fields and provides no sex field from which the stored female/male classifications could be reconstructed. Straightforward decade-overlap counts for dancers and premiere-decade counts for works do not reproduce every displayed total. The chart is therefore retained as a historical learning artifact, not presented as a fully reproducible analysis of these files.
