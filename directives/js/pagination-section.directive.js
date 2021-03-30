angular.module('movieApp').directive('paginationSection', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/pagination-section.directive.html',
        scope: {
            currentpage: "@",
            totalpages:"@",
            onpageclick:'&',
        },
        controller: function ($scope) {
            const NOOFPAGESIONEPART=3;
            const NOOFPAGESWITHACTIVE=2
            $scope.firstPart ;
            $scope.middlePart;
            $scope.lastPart;


            $scope.createPagination = function () {
                let first = [];
                let middle = [];
                let last = [];
                $scope.currentpage=parseInt($scope.currentpage)
                $scope.totalpages=parseInt($scope.totalpages)
                const CURRENTPAGE=$scope.currentpage
                const TOTALPAGES=$scope.totalpages
                if (CURRENTPAGE < (NOOFPAGESIONEPART+NOOFPAGESWITHACTIVE*2)) {
                    middle = [];
                    if ((CURRENTPAGE + NOOFPAGESWITHACTIVE) >= (TOTALPAGES -NOOFPAGESWITHACTIVE  - 1)) {
                        first = Array(TOTALPAGES).fill().map((_, i) => i + 1);
                        last = [];
                    }
                    else {
                        const FUPMARGIN = Math.min(CURRENTPAGE+ NOOFPAGESWITHACTIVE, TOTALPAGES)
                        first = Array(FUPMARGIN).fill().map((_, i) => i + 1)
                        last = Array(3).fill().map((_, i) => TOTALPAGES- NOOFPAGESIONEPART + i + 1)
                    }
                } else {
                    first = Array(3).fill().map((_, i) => i + 1)
                    if ((CURRENTPAGE + NOOFPAGESWITHACTIVE) >= (TOTALPAGES - NOOFPAGESWITHACTIVE - 1)) {
                        middle = [];
                        const MARGIN = TOTALPAGES - (CURRENTPAGE- NOOFPAGESWITHACTIVE) + 1
                        last = Array(MARGIN).fill().map((_, i) => TOTALPAGES - MARGIN + i + 1)
                    }
                    else {
                        last = Array(NOOFPAGESIONEPART).fill().map((_, i) => TOTALPAGES- 3 + i + 1)
                        middle = Array(NOOFPAGESIONEPART + 2).fill().map((_, i) => CURRENTPAGE - NOOFPAGESIONEPART + i + 1)
                    }
                }
                $scope.firstPart=first;
                $scope.middlePart=middle;
                $scope.lastPart=last;
            }
        },
        link: function (scope) {
            scope.onclick = function (value) {
                scope.currentpage= value
                scope.createPagination()
                scope.onpageclick({ pageNumber: value })
            };
            scope.$watch('totalpages', function() {
                scope.createPagination()   
            });
        }
    }
})
