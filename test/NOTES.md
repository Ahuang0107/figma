# skia notes

## canvas

```typescript
interface Canvas extends EmbindObject<Canvas> {
    /**
     * 保存画布当前的状态，比如平移呀，缩放之类的
     */
    save(): number;

    /**
     * 恢复到上次保存的画布状态
     * 具体使用场景可以看 https://stackoverflow.com/questions/59650399/what-is-canvas-save-and-canvas-restore
     */
    restore(): void;

    /**
     * 移动画布，简单来说就是将画布的原地移动多少距离，多次调用是叠加的
     * @param dx 画布向右移动的距离
     * @param dy 画布向下移动的距离
     */
    translate(dx: number, dy: number): void;
}
```
