angular.module('movieApp').component('personCreditsList', {
    templateUrl: 'components/person-credits-list/person-credits-list.html',
    controller: function ($scope, appDataService, $route,$location) {
        const PERSONID = $route.current.params.personId
        const NUMBEROFKNOWITEMS=8
        $scope.creditsData=[];
        $scope.knownForData=[];
        appDataService.getPersonCombineCredits(PERSONID).then(function (data) {
            let tempKnownData=[]
            data.forEach(element => {
                element.dataLines.sort((b,a) => (a.popularity > b.popularity) ? 1 : ((b.popularity > a.popularity) ? -1 : 0))  
                tempKnownData.push(...element.dataLines.slice(0, NUMBEROFKNOWITEMS))
                element.dataLines.sort((b,a) => (a.realeseDate > b.realeseDate) ? 1 : ((b.realeseDate > a.realeseDate) ? -1 : 0))
                
            });
            
            $scope.creditsData=data

            tempKnownData.sort((b,a) => (a.popularity > b.popularity) ? 1 : ((b.popularity > a.popularity) ? -1 : 0))  
            const uniqueMovies= Array.from(new Set(tempKnownData.map(a => a.id))).map(id => {
                return tempKnownData.find(a => a.id === id)
            })
            $scope.knownForData=uniqueMovies.slice(0,NUMBEROFKNOWITEMS);
        }, function (error) {
            console.error(error)
        });

        $scope.onItemClick = function (id,mediaType) {
            $location.replace()
            $location.url(`/${mediaType}/${id}`);
        }
    }
});
