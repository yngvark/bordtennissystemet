export function scheduleMatches(players) {
    const num = players.length;
    const isOdd = num % 2 !== 0;
    let playersList = [...players];
    
    if (isOdd) playersList.push(null); // Add bye if odd
    const total = playersList.length;
    const half = total / 2;
    const rounds = total - 1;
    const schedule = [];
    
    // Initialize home and away counts
    const homeCount = {};
    const awayCount = {};
    players.forEach(player => {
        homeCount[player] = 0;
        awayCount[player] = 0;
    });
    
    let matchId = 1; // Initialize match ID counter
    
    for (let round = 0; round < rounds; round++) {
        for (let i = 0; i < half; i++) {
            const home = playersList[i];
            const away = playersList[total - 1 - i];
            
            if (home && away) { // Exclude matches with null (bye)
                let matchHome, matchAway;
                
                if (homeCount[home] < homeCount[away]) {
                    matchHome = home;
                    matchAway = away;
                } else if (homeCount[away] < homeCount[home]) {
                    matchHome = away;
                    matchAway = home;
                } else {
                    // If both have equal home counts, alternate based on round
                    if (round % 2 === 0) {
                        matchHome = home;
                        matchAway = away;
                    } else {
                        matchHome = away;
                        matchAway = home;
                    }
                }
                
                schedule.push({ id: matchId++, home: matchHome, away: matchAway, homeScore: 0, awayScore: 0 });
                homeCount[matchHome]++;
                awayCount[matchAway]++;
            }
        }
        // Rotate players except the first
        playersList.splice(1, 0, playersList.pop());
    }
    
    return schedule;
}
