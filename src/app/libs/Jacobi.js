class JacobiSolver {
    constructor(koefisien, konstan, tebakanAwal, maksIterasi, toleransi) {
        this.koefisien = koefisien;
        this.konstan = konstan;
        this.tebakanAwal = tebakanAwal.slice();
        this.maksIterasi = maksIterasi;
        this.toleransi = toleransi;
        this.n = koefisien.length;
    }

    solve() {
        let x = this.tebakanAwal.slice();
        let iterationsData = [];

        for (let k = 0; k < this.maksIterasi; k++) {
            const x_baru = new Array(this.n).fill(0);

            for (let i = 0; i < this.n; i++) {
                let jumlah = 0;
                for (let j = 0; j < this.n; j++) {
                    if (j !== i) {
                        jumlah += this.koefisien[i][j] * x[j];
                    }
                }
                x_baru[i] = (this.konstan[i] - jumlah) / this.koefisien[i][i];
            }

            let error = 0;
            for (let i = 0; i < this.n; i++) {
                error = Math.max(error, Math.abs(x_baru[i] - x[i]));
            }

            iterationsData.push({ iteration: k + 1, error, x_baru: [...x_baru] });

            if (error < this.toleransi) {
                console.log(`Konvergen dalam ${k + 1} iterasi.`);
                return { solution: x_baru, iterationsData };
            }

            x = x_baru;
        }

        console.log(`Tidak konvergen dalam ${this.maksIterasi} iterasi.`);
        return { solution: null, iterationsData };
    }
}

export default JacobiSolver;