import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class GalleryComponent implements OnInit {
    @Input() images: string[] | undefined;

    selectedImageURL: string | undefined;

    ngOnInit(): void {
        if (this.images?.length) {
            this.selectedImageURL = this.images[0];
        }
    }
    changeSelectedImage(imageUrl: string) {
        this.selectedImageURL = imageUrl;
    }

    get hasImages() {
        if (this.images) {
            return this.images?.length > 0;
        }
        return null;
    }
}
