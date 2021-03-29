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
            $scope.firstPart ;
            $scope.middlePart;
            $scope.lastPart;

            $scope.createPagination = function () {
                let first = [];
                let middle = [];
                let last = [];
                $scope.currentpage=parseInt($scope.currentpage)
                $scope.totalpages=parseInt($scope.totalpages)
                const currentPage=$scope.currentpage
                const totalPages=$scope.totalpages
                if (currentPage < 7) {
                    middle = [];
                    if ((currentPage + 2) >= (totalPages - 2 - 1)) {
                        first = Array(totalPages).fill().map((_, i) => i + 1);
                        last = [];
                    }
                    else {
                        const fupMargin = Math.min(currentPage+ 2, totalPages)
                        first = Array(fupMargin).fill().map((_, i) => i + 1)
                        last = Array(3).fill().map((_, i) => totalPages- 3 + i + 1)
                    }
                } else {
                    first = Array(3).fill().map((_, i) => i + 1)
                    if ((currentPage + 2) >= (totalPages - 2 - 1)) {
                        middle = [];
                        const mar = totalPages - (currentPage- 2) + 1
                        last = Array(mar).fill().map((_, i) => totalPages - mar + i + 1)
                    }
                    else {
                        last = Array(3).fill().map((_, i) => totalPages- 3 + i + 1)
                        middle = Array(3 + 2).fill().map((_, i) => currentPage - 3 + i + 1)
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
